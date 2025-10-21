import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./lib/queries"
import { client } from "./sanity/lib/client"
import { writeClient } from "./sanity/lib/write-client"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({user: {name, email, image}, account, profile: {id, login, bio}}) {
        const githubId = id;
      const docId = `author.${githubId}`;
      const existingUser = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: docId,})
      if(!existingUser) {
        await writeClient.createIfNotExists({
          _type: 'author',
          _id: docId,
          id: githubId, 
          name,
          username: login,
          email,
          image,
          bio: bio || ""
        })
    
      }
      return true
    },
    async jwt( {token, account, profile} ) {
      if(account && profile) {
         const docId = `author.${profile?.id}`;
        const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: docId,
        })

        token.id = user?._id || docId;
      }
      return token;
    },
    async session({session, token}) {
      Object.assign(session, {id: token.id});
      return session;
    }
  }
})
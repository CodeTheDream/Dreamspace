// import { useState, useEffect } from 'react'

//import UserCard from './usercard'

//**4. Render all team members info into team member cards**

//5. onClick team member takes you to a route that is at directoy id





// export default function teamcard(user) {

//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [title, setTitle] = useState('')
//   const [developer, setDeveloper] = useState('')
//   const [github, setGithub] = useState('')
//   const [error, setError] = useState(false)
//   const [loading, setLoading] = useState(true)
  
//   useEffect(() => {
//       const unsubscribe = firebase
//         .firestore()
//         .collection('users')
//         .doc(id)
//         .collection('user')
//         .onSnapshot(
//           snapshot => {
//             const users = []
//             snapshot.forEach(user => {
//               users.push(user)
//             })
//             setLoading(false)
//             setFirstName(firstName)
//             setLastName(lastName)
//             setTitle(title)
//             setDeveloper(developer)
//             setGithub(github)
//           },
//           err => {
//             setError(err)
//           }
//         )

//       return () => unsubscribe()
//     },
//     [id]
//   )

//   return {
//     error,
//     loading,
//     firstName,
//     lastName,
//     title,
//     developer,
//     github,
//   }
// }

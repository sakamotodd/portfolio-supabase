// import { signOut } from 'firebase/auth';
// import { useRouter } from 'next/router';
// import Cookies from 'universal-cookie';
// import { Auth } from '../../util/firebase/firebase.config';
// import { unSubMeta } from '../../util/firebase/useUserChanged';

// const cookie = new Cookies();
// export const useLogout = () => {
//   const router = useRouter();
//   const logout = async () => {
//     if (unSubMeta) {
//       unSubMeta();
//     }
//     await signOut(Auth);
//     cookie.remove('token');
//     router.push('/login/signIn');
//   };
//   return { logout };
// };

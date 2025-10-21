// import Link from "next/link";
// import { posts } from "@/content/writing/posts";

// export const metadata = {
//   title: "Writing — Tommy Ross",
// };

// export default function WritingIndex() {
//   const entries = [
//     ...posts,
//     { slug: "placeholder-1", meta: { title: "Choosing constraints" } as any },
//     { slug: "placeholder-2", meta: { title: "Small surfaces, big impact" } as any },
//     { slug: "placeholder-3", meta: { title: "Interfaces as contracts" } as any },
//   ];

//   return (
//     <div className="py-10">
//       <h1 className="text-2xl font-medium tracking-tight mb-6">Writing</h1>
//       <ul className="space-y-3">
//         {entries.map((p) => (
//           <li key={p.slug}>
//             <Link href={`/writing/${p.slug}`} className="hover:underline underline-offset-4">
//               {p.meta.title}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }



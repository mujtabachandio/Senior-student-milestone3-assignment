import Link from 'next/link';
import Image from 'next/image';
import { posts } from './data/posts';

export default function HomePage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
      {posts.map(post => (
        <div key={post.id} className="border rounded-lg overflow-hidden shadow-lg">
         
          <Image 
            src={post.image} 
            alt={post.title} 
            className="w-full h-48 object-cover" 
            width={400} 
            height={200} 
            layout="responsive" 
          />
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600 mb-4">{post.description}</p>
            <Link href={`/posts/${post.id}`}>
              <a className="text-blue-500 hover:underline">Read more</a>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

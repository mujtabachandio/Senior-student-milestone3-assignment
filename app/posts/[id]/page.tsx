"use client";

import React, { useState } from 'react';
import { posts } from '../../data/posts';
import { notFound } from 'next/navigation';
import Image from 'next/image'; // Import Next.js Image component

interface PostProps {
  params: {
    id: string;
  };
}

const PostPage = ({ params }: PostProps) => {
  // Finding the post at the top before any conditional logic
  const post = posts.find((p) => p.id === params.id);

  // Handling the case where the post is not found
  if (!post) {
    return notFound();
  }

  // Hooks must be called at the top of the component
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  // Handle comment input change
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

  // Handle comment submission
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {/* Use Next.js Image component for optimization */}
      <Image 
        src={post.image} 
        alt={post.title} 
        className="mb-4"
        width={800} // Adjust the width and height based on your image size
        height={450} 
        layout="responsive"
      />

      <p className="text-lg mb-4">{post.content}</p>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Comments</h2>
        <div className="mb-4">
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              className="text-black w-full p-2 border border-gray-300 rounded"
              rows={4}
              placeholder="Add a comment..."
            />
            <button
              type="submit"
              className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-red-700"
            >
              Post Comment
            </button>
          </form>
        </div>
        <ul>
          {comments.map((comment, index) => (
            <li key={index} className="border-b border-gray-200 py-2">
              {comment}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default PostPage;

'use client';

import { useEffect, useState } from 'react';
import fetcher from '@/lib/fetcher';

export default function AdminCommentsPage() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetcher('/comments')
      .then(res => {
        setComments(res.data);
        console.log('Fetched comments:', res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching comments:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      await fetcher(`/delete-comment?id=${id}`, 'DELETE');
      setComments(comments.filter(comment => comment.comment_id !== id));
    } catch (err) {
      alert('Error deleting comment.');
    }
  };

  if (loading) return <p className='text-center text-2xl pt-40'>Loading...</p>;

  return (
    <div className="p-6 pt-20 bg-gray- min-h-screen text-gray-50 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Admin - Comments</h1>
      <ul className="space-y-3">
        {comments.map(comment => (
          <li key={comment.comment_id} className="flex flex-col justify-between items-center border p-2 rounded-lg">
            <div>
              <p className="font-medium">ID: {comment.comment_id}</p>
              <p>Comment: {comment.content}</p>
              <p className="text-sm text-gray-500">Post: {comment.post_id}</p>
              <p className="text-sm text-gray-500">By: {comment.user_id}</p>
            </div>
            <button
              className="text-white text-center w-full mt-4 p-1 hover:underline rounded-md bg-red-500"
              onClick={() => handleDelete(comment.comment_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

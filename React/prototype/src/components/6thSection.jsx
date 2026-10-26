import { useState } from 'react';
/* eslint-disable */

export const Waitlist = () => {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage('');
    setIsError(false);

    try {
      const response = await fetch('https://spendsense-4elh.onrender.com/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage(data.message);
        setEmail(''); // Clear input on success
      } else {
        setIsError(true);
        setStatusMessage(data.error || 'Something went wrong.');
      }
    } catch (error) {
      setIsError(true);
      setStatusMessage('Unable to connect to the server.');
    }
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="max-w-2xl mx-auto bg-gray-500 rounded-3xl p-10 md:p-16 text-center shadow-2xl">

        <h2 className="text-3xl md:text-5xl font-bold text-[#FFF8F0] mb-4">
          Be the first to try it.
        </h2>

        <p className="text-lg text-[#FFF8F0]/70 mb-8">
          Join the waitlist. Early users get free access at launch.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-5 py-4 rounded-xl bg-[#FFF8F0]/10 text-[#FFF8F0] placeholder:text-[#FFF8F0]/40 border border-[#FFF8F0]/20 focus:outline-none focus:border-[#FF6B4A] transition"
          />
          <button type="submit" className="bg-[#FF6B4A] text-white font-semibold px-8 py-4 rounded-xl hover:scale-105 hover:shadow-xl transition-all ease-in-out duration-300 whitespace-nowrap shadow-2xl cursor-pointer" > 
            Join the waitlist 
          </button>
        </form>

        {statusMessage && (
          <p className={`text-sm mt-4 font-semibold ${isError ? 'text-red-400' : 'text-emerald-400'}`}>
            {statusMessage}
          </p>
        )}

        <p className="text-sm text-[#FFF8F0]/40 mt-6">
          No spam. Just one email when we launch.
        </p>

      </div>
    </section>
  );
};

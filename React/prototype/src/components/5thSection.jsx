

export const Trust = () => {
  return (
    <section className="min-h-screen relative py-24 md:py-32 px-6">
      <div className="max-w-2xl mx-auto bg-gray-400 rounded-3xl p-10 md:p-16 shadow-sm absolute top-0 left-0">

        {/* Founder story */}
        <div className="mb-12 pb-12 border-b border-warmgrey/15">
          <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
            Built because we were tired of losing track too.
          </h2>

          <p className="text-lg text-warmgrey mb-4">
            We tried spreadsheets. We tried notes apps. We tried bank alerts.
            None of them stuck. So we're building the tracker we always wanted —
            one that doesn't feel like work, and doesn't require you to be a
            finance person to use.
          </p>

          <p className="text-sm text-warmgrey/80">
            — The [App Name] team
          </p>
        </div>
      </div>
      <div className="max-w-2xl mx-auto bg-gray-400 rounded-3xl p-10 md:p-16 shadow-sm absolute right-0 bottom-0">
        {/* Security */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-charcoal/5 flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-6 h-6 text-charcoal"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h3 className="text-xl md:text-2xl font-semibold text-charcoal mb-3">
            Your money data stays yours.
          </h3>

          <p className="text-base text-warmgrey mb-3">
            No ads. No selling your data. No bank connection without your permission.
            Everything you log is private and used only to show you where your money went.
          </p>

          <p className="text-sm text-warmgrey/80">
            No bank connection required to start. Log manually first, connect later if you want.
          </p>
        </div>
      </div>
    </section>
  );
}
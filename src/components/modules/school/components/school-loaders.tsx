// Loading state component
export function SchoolTableListLoadingState() {
  return (
    <div className="p-8 text-center text-muted-foreground">
      <svg
        className="mx-auto mb-4 h-10 w-10 animate-spin text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth={4}
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
      <p className="text-lg font-medium">Loading schools...</p>
    </div>
  )
}

// Error state component
export function SchoolTableListListErrorState({ error }: { error?: Error }) {
  return (
    <div className="p-8 text-center text-destructive">
      <svg
        className="mx-auto mb-4 h-10 w-10 text-destructive"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.68-1.36 3.446 0l6.518 11.603c.75 1.335-.213 2.998-1.724 2.998H3.463c-1.51 0-2.474-1.663-1.724-2.998L8.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-.75-4.75a.75.75 0 00-1.5 0v3a.75.75 0 001.5 0v-3z"
          clipRule="evenodd"
        />
      </svg>
      <h3 className="text-xl font-semibold mb-2">Failed to load schools</h3>
      <p className="text-sm">{error?.message || "An unexpected error occurred."}</p>
    </div>
  )
}

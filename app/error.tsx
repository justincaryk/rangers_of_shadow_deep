'use client'

export interface FallbackProps {
  error: Error
  resetErrorBoundary?: (...args: Array<unknown>) => void
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  return (
    <div role='alert'>
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

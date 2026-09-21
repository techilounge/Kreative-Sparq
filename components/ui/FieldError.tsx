export function FieldError({ id, message }: { readonly id: string; readonly message?: string }) {
  if (!message) return null;

  return (
    <p id={id} className="text-status-error flex items-start gap-1.5 text-sm/6 font-medium">
      {/* The exclamation carries the meaning for anyone who cannot see the colour. */}
      <span aria-hidden className="mt-px font-semibold">
        !
      </span>
      <span>{message}</span>
    </p>
  );
}

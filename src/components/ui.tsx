import type {
  ButtonHTMLAttributes,
  HTMLAttributes,
  PropsWithChildren,
} from "react"
import { Link, type LinkProps } from "react-router-dom"
import { cn } from "@/lib/cn"

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-line bg-surface p-5 shadow-card",
        className,
      )}
      {...props}
    />
  )
}

export function Eyebrow({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "text-xs font-semibold uppercase tracking-[0.18em] text-teal",
        className,
      )}
      {...props}
    />
  )
}

export function Button({
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink-inverse transition hover:bg-teal-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export function ButtonLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={cn(
        "inline-flex min-h-10 items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-ink-inverse transition hover:bg-teal-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal",
        className,
      )}
      {...props}
    />
  )
}

export function Badge({
  tone = "neutral",
  className,
  children,
}: PropsWithChildren<{
  tone?: "neutral" | "teal" | "amber" | "violet" | "green"
  className?: string
}>) {
  const tones = {
    neutral: "border-line bg-surface-raised text-ink-muted",
    teal: "border-teal/25 bg-teal/10 text-teal",
    amber: "border-amber/25 bg-amber/10 text-amber",
    violet: "border-violet/25 bg-violet/10 text-violet",
    green: "border-green/25 bg-green/10 text-green",
  }
  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

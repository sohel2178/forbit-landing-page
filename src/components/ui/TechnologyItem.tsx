/** A single technology rendered as a mono "spec chip". */
export function TechnologyItem({ name }: { name: string }) {
  return (
    <li className="group/chip inline-flex items-center gap-2 rounded-md border border-fg/[0.08] bg-fg/[0.03] px-2.5 py-1.5 font-mono text-[0.72rem] tracking-wide text-fg/75 transition-colors duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-fg">
      <span aria-hidden className="size-1 rounded-full bg-brand/60 transition-colors group-hover/chip:bg-brand-bright" />
      {name}
    </li>
  );
}

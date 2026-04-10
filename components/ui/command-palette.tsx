"use client";

import * as React from "react";
import { Command } from "cmdk";
import { commandItems } from "@/lib/portfolio-data";
import { useCommandPalette } from "@/hooks/use-command-palette";

export function CommandPalette() {
  const { open, setOpen } = useCommandPalette();

  const onSelect = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] grid place-items-start bg-slate-950/45 p-4 pt-24 backdrop-blur-sm">
      <Command className="w-full max-w-xl overflow-hidden rounded-2xl border border-white/20 bg-slate-900/90 text-slate-100 shadow-2xl">
        <Command.Input
          autoFocus
          placeholder="Type a command or search..."
          className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-sm outline-none"
        />
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="p-3 text-sm text-slate-400">
            No results found.
          </Command.Empty>
          <Command.Group heading="Navigation" className="text-xs text-slate-500">
            {commandItems.map((item) => (
              <Command.Item
                key={item.href}
                onSelect={() => onSelect(item.href)}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm data-[selected=true]:bg-white/10"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}

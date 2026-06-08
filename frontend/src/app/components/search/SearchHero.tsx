import { Search } from 'lucide-react';

type SearchHeroProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSubmit: () => void;
  isSearching: boolean;
};

export function SearchHero({
  query,
  onQueryChange,
  onSubmit,
  isSearching,
}: SearchHeroProps) {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-6 py-10 shadow-[0_20px_80px_rgba(15,23,42,0.06)] sm:px-8 lg:px-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-slate-500">
            Search-first workspace
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-slate-900 sm:text-5xl">
            Tra cứu container trong vài giây
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Nhập container, booking, B/L hoặc PO để xem ngay status, file nguồn và email liên
            quan mà không phải mở nhiều nơi.
          </p>
        </div>

        <form
          className="rounded-[24px] border border-slate-200 bg-[#f6f2ea] p-4"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label className="mb-3 block text-sm font-medium text-slate-700">
            Mã cần tra cứu
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Nhập container / booking / B/L / PO"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4 text-base text-slate-900 outline-none transition focus:border-slate-900"
              />
            </div>
            <button
              type="submit"
              className="h-14 rounded-2xl bg-slate-900 px-6 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              {isSearching ? 'Đang tra cứu...' : 'Tra cứu'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- User progress (profile, chapters, tasks, mock attempts) is stored in localStorage via `useStored` in src/lib/store.ts — no accounts yet; migrate to Lovable Cloud when login/premium payments are added.
- Syllabus and mock questions live as static data in src/data/ so content edits don't touch UI code.

# awkward-lib

`polyglot-lib` covers the tidy case: one target per top-level language
directory. Real repositories are not tidy. This fixture is every layout that is
awkward in a *different* way, so target resolution and re-rooting are pinned
against shapes people actually have.

| Target | Source | Awkward because |
| --- | --- | --- |
| `nodejs` | `clients/generated/v2/typescript/` | Four levels down, under generated-code directories — the shape an OpenAPI/protobuf generator imposes |
| `python` | `services/py-worker/` | Nothing in the path says "python"; the language has to come from the manifest and the `pyproject.toml` marker |
| `rust` | `deeply/nested/rust-core/` | Hyphen in the path, three levels of nesting, source under an inner `src/` |
| `repository` | `.` | The **whole repository** as one more package, alongside the slices |

## What is verified

Against a real `zed publish`, all four publish and each artifact is re-rooted at
its own subtree. The deep node target collapses entirely:

```console
$ tar tzf zedtest-awkward-lib-nodejs-0.1.0.tar.gz
pkg/.zpkg.toml
pkg/LICENSE
pkg/index.js          # <- was clients/generated/v2/typescript/index.js
pkg/package.json
```

Four levels of path vanish, so a consumer's import path does not depend on how
the producing repo happens to be organized. The root `LICENSE` is carried into
every slice. The `repository` target keeps full paths and carries all nine
tracked files — one repo yielding both per-language packages *and* an
everything package.

## A target directory may not carry its own manifest

Inside a *polyglot target*, a nested manifest is refused:

```console
$ # with a .zpkg.toml added under services/py-worker/
$ zed publish
error: target `python` contains its own .zpkg.toml; declare packages only in the repository-root manifest
```

`dir = "."` is the single exception — the whole-repository target is allowed to
sit atop the root manifest. For every other target, the slices of one package
are declared in exactly one place, so there is never a question of which
manifest won.

**This is not a ban on sub-projects.** It is specific to targets, which are
language slices of a *single* package. Several independent packages in one repo
are a different thing and have their own mechanism — a `[workspace]` root with
`members`, each member carrying its own manifest and member→member dependencies
linking by path rather than through the registry. See
[`workspace-monorepo`](https://github.com/zed-pkg-test/workspace-monorepo) for
that shape. Reach for targets when one package ships several languages, and for
workspace members when one repo ships several packages.

## License

MIT

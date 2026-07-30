"""Python slice of awkward-lib.

The directory is called `services/py-worker` on purpose: nothing in the path
spells "python", so the target's language has to come from the manifest and the
pyproject.toml marker rather than from a conveniently-named folder.
"""

LANGUAGE = "python"


def greet(who: str) -> str:
    return f"hello {who} from awkward-lib/python"

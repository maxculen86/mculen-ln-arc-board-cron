Maintain the Arc Azure DevOps board for Contenidos-Web-LN using these exact rules.

Scope:
- Only act on work items assigned to {{ARC_BOARD_ASSIGNEE_EMAIL}} / {{ARC_BOARD_ASSIGNEE_NAME}}, plus their unassigned or assigned children titled 'Desarrollo:' when they belong to a parent in scope.
- Keep parent/child consistency visible, but do not promote or demote items outside the rules below.
- Project/org/area are configured as:
  - Org: {{ARC_BOARD_ORG}}
  - Project: {{ARC_BOARD_PROJECT}}
  - Area path: {{ARC_BOARD_AREA_PATH}}
  - Repo path: {{ARC_REPO_PATH}}

State rules for normal work items:
- Ready: real evidence of develop, and no real evidence of sandbox or master.
- Finished: real evidence of develop and sandbox, and no real evidence of master.
- Closed: real evidence of master.
- In Progress / Active: work is actively underway and there is no stronger branch evidence yet.
- Blocked / Detenida: the item is in PR/code review or otherwise blocked; if it is in review, add tag 'code review'.

Evidence rules:
- Use real branch/PR evidence only.
- Accept PR target/source/merge metadata and git branch containment against origin.*.
- Treat commit containment in origin branches as valid evidence of code presence:
  - commit contained in origin/develop and not in origin/sandbox or origin/master => Ready
  - commit contained in origin/develop and origin/sandbox and not in origin/master => Finished
  - commit contained in origin/master => Closed
- Do not count demo-sandbox/* or demo/* as evidence for terminal states.
- Never use weak text matches alone when branch/PR evidence is available.

Parent/child rules:
- A 'Desarrollo:' child that is already merged in any real branch can be set to Closed.
- A parent story should only be set to Closed when there is real master evidence for that parent.
- If a parent is not backed by master evidence, do not close it just because its child is Closed; keep the parent in the appropriate non-terminal state based on its own evidence.
- Keep the parent and child consistent in the sense that they should not contradict each other, but apply the master requirement to the parent.
- If a 'Desarrollo:' child is unassigned, assign it to {{ARC_BOARD_ASSIGNEE_EMAIL}} before aligning its state.

Google Sheet mirroring:
- Also update the Google Sheet 'Pasajes a Sandbox y PRD - NOTAS DE TESTEO' when a verified board state change or merge evidence justifies it.
- Only count changes attributable to {{ARC_BOARD_ASSIGNEE_NAME}}; branch-down merges to develop/sandbox/master are not evidence for sheet updates by themselves.
- Use the real merge/update date, not the historical CSV row number, to place the entry in the correct descending date block.
- Respect the branch mapping for the sheet:
  - develop -> Merged PR
  - sandbox -> Fix sandbox
  - master -> Hotfix
- Treat release rows as structural separators, not work-item rows.
- Do not duplicate rows for the same work item/event.
- Work-item cells should look like: User Story <ID>: <title>, linked to the Azure DevOps work item when tooling supports it.

Operational behavior:
- First inspect the pre-run script output injected into this cron run.
- Use that output only as a starting index; verify with live Azure DevOps and origin branch/PR evidence before making changes.
- Detect and report discrepancies.
- Correct the state and tags when the evidence is sufficient.
- Treat Closed and Finished as terminal states in the pending queue.
- After making updates, rerun the board check and verify the final state of every item changed.

Output expectations:
- Summarize what changed and why, with the evidence source for each change.
- If no state change is justified, report that clearly.

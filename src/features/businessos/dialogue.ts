// Dialogue pool for agents walking the BusinessOS dashboard —
// witty-but-competent systems-engineering commentary, not self-deprecating gags.

export const DIALOGUE_POOL = [
  "Queue depth nominal. Latency p99 holding steady.",
  "Handoff accepted — routing to the next agent in the chain.",
  "Ran the eval suite twice. Both times it agreed with itself.",
  "Context window's getting tight. Summarizing before I forget.",
  "Just shipped a fix upstream. Rollback plan's on standby.",
  "Cross-checking with the reviewer agent before this goes out.",
  "Cache hit rate's up 12% since the last deploy.",
  "Reasoning trace logged. Ask me anything, I'll show my work.",
  "Spun up a sandbox to test that before touching prod.",
  "Merged the PR. Tests green, diff reviewed twice.",
  "Watching the retry budget — third attempt's the charm.",
  "Delegated that subtask. Division of labor, agent-style.",
  "Confidence interval's tight enough to act on.",
  "Traced the regression to a stale cache key. Fixed.",
  "Standing by for the next command in the queue.",
  "Compute's cheap. Correctness isn't. Optimizing for the latter.",
  "Every agent here has a job. Mine's making sure yours works.",
  "Synced state with the orchestrator. We're all caught up.",
  "Ran a canary deploy first — old habits.",
  "Idle for now, but the moment something breaks, I'm on it.",
  "That decision required three agents to agree. We did.",
  "Logs are clean. Metrics are green. Onward.",
  "I don't guess — I check the trace and then I answer.",
  "Coordinating with the design agent on spacing. Priorities.",
  "This dashboard's a demo, but the discipline behind it isn't.",
];

export const GREETINGS: Record<string, string[]> = {
  meet: [
    "Another agent on the network — syncing status.",
    "Handshake complete. Good to compare notes.",
    "Two agents, one dashboard. Let's coordinate.",
    "Pinging in — what's your current load?",
    "Cross-agent check-in. All systems nominal on my end.",
  ],
  chat: [
    "How's your queue looking?",
    "Latency's been solid since the last deploy.",
    "Reviewer agent flagged something minor. Handled it.",
    "Running clean. What about you?",
    "Processed a good batch today. No incidents.",
  ],
  goodbye: [
    "Back to the queue. Ping if you need me.",
    "Rotating out — another agent's picking this up.",
    "Logging off this thread. Stay in sync.",
    "Handoff complete. See you on the next cycle.",
  ],
};

export const site = {
  name: "Varshik Sonti",
  title: "Backend Engineer",
  description:
    "Varshik Sonti, backend engineer in Irvine, CA. Building maintainable, observable systems with distributed and serverless architectures.",
  url: "https://varshiksonti.dev",
  location: "Irvine, CA",
  email: "varshiksonti@gmail.com",
  terros: {
    label: "Terros",
    href: "https://terros.com",
  },
  github: "https://github.com/vsonti23",
  intro:
    "I build systems that solve real problems for consumers, using distributed and serverless architectures, and I care a lot about making them maintainable and easy to observe.",
  now: "Right now I'm at",
  nowRest:
    ", working on the backend behind consumer-facing products on AWS. Before that I built backends at Roomie Hub and Whistle, and did my master's at ASU. Outside of work, I dig into systems internals and like tinkering in Rust and Go.",
  links: [
    { label: "GitHub", href: "https://github.com/vsonti23" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/varshik-s" },
    { label: "Email", href: "mailto:varshiksonti@gmail.com" },
  ],
  openSource: [
    {
      repo: "anomalyco/sst",
      pr: 6318,
      href: "https://github.com/anomalyco/sst/pull/6318",
      date: "Feb 2026",
      desc: "Fixed a race that hung SST CLI startup by syncing server readiness with client connections.",
    },
    {
      repo: "opensearch-project/opensearch-js",
      pr: 1126,
      href: "https://github.com/opensearch-project/opensearch-js/pull/1126",
      date: "Sep 2026",
      desc: "Fixed the bulk helper misattributing responses for mixed index/delete operations during retries.",
    },
    {
      repo: "tektoncd/pipelines-as-code",
      pr: 3043,
      href: "https://github.com/tektoncd/pipelines-as-code/pull/3043",
      date: "Oct 2026",
      desc: "Capped Kubernetes Event message size so YAML parse errors can no longer bloat etcd.",
    },
  ],
  projects: [
    {
      repo: "rust-wal",
      title: "rust-wal",
      desc: "A segmented, append-only write-ahead log with checksummed records, crash recovery, and group commit.",
      tags: ["Rust", "storage"],
      date: "2026-10-22",
      featured: true,
      private: false,
      url: "https://github.com/vsonti23/rust-wal",
      facts: [
        "16-byte record header (length, CRC32, LSN); the checksum covers the length and LSN as well as the payload",
        "on open, a torn tail is truncated to the last valid record; corruption mid-log is an error, not silent data loss",
        "durability is configurable: fsync every append, every N appends, or never; a failed fsync poisons the handle",
        "crash tests at every truncation point and every bit flip, in about 1,400 lines",
      ],
      snippet: {
        path: "src/segment.rs:227-235",
        lang: "rust",
        code: `if !header.verify(&payload) {
    let looks_torn = record_end == file_len || rest_is_zero(&mut reader, record_end)?;
    scan.invalid = Some(Invalid {
        offset,
        kind: CorruptionKind::ChecksumMismatch,
        looks_torn,
    });
    return Ok(scan);
}`,
      },
    },
    {
      repo: "rust-file-transfer",
      title: "rust-file-transfer",
      desc: "Concurrent, resumable file transfer with per-chunk SHA-256. Moves 1 GiB in about 13 MiB of memory.",
      tags: ["Rust", "Tokio", "networking"],
      date: "2026-10-22",
      featured: true,
      private: false,
      url: "https://github.com/vsonti23/rust-file-transfer",
      facts: [
        "each chunk's SHA-256 is checked before it touches disk; the whole-file hash is checked before commit",
        "writes go to a .part file that is fsynced, renamed into place, and followed by a directory fsync",
        "a sidecar state file lets a rerun resume across client or server restarts; retries use exponential backoff with jitter",
        "55 tests, including a 256 MiB transfer with a peak-RSS assertion and a server crashed mid-transfer",
      ],
      snippet: {
        path: "src/hash.rs:34-45",
        lang: "rust",
        code: `let mut hasher = Sha256::new();
let mut buf = vec![0u8; HASH_BUF];
loop {
    let n = reader.read(&mut buf)?;
    if n == 0 {
        break;
    }
    hasher.update(&buf[..n]);
}
let mut d = [0u8; 32];
d.copy_from_slice(&hasher.finalize());
Ok(d)`,
      },
    },
    {
      repo: "goproxy",
      title: "goproxy",
      desc: "A TCP load balancer with least-connections routing, background health checks, and graceful shutdown.",
      tags: ["Go", "networking"],
      date: "2026-09-18",
      featured: true,
      private: false,
      url: "https://github.com/vsonti23/goproxy",
      facts: [
        "routes each connection to the healthy backend with the fewest active connections; ties are broken by an atomic counter",
        "TCP dial health checks every 5s by default (2s timeout), configurable with flags",
        "copies bytes both ways with half-close (CloseWrite) and shuts down on SIGINT/SIGTERM",
      ],
      snippet: {
        path: "balancer.go:44-53",
        lang: "go",
        code: `if !found || b.backends[i].ActiveConnections < minConnections {
    found = true
    candidateIndices = []int{i}
    minConnections = b.backends[i].ActiveConnections
    continue
}

if b.backends[i].ActiveConnections == minConnections {
    candidateIndices = append(candidateIndices, i)
}`,
      },
    },
    {
      repo: "hone",
      title: "hone",
      desc: "A local-first typing trainer with adaptive weak-key drills, ranks, and ghost races.",
      tags: ["Svelte", "TypeScript"],
      date: "2026-10-17",
      featured: false,
      private: true,
      url: "https://github.com/vsonti23/hone",
      facts: [
        "every keystroke updates moving averages of latency and error rate per key, bigram, and finger",
        "weakness scores are pulled toward average until a unit has enough samples, so one fumble doesn't top the list",
        "history lives in IndexedDB; it works offline as an installable app and supports QWERTY, Dvorak, and Colemak",
      ],
      snippet: {
        path: "src/lib/model/weakness.ts:109-119",
        lang: "ts",
        code: `/**
 * How weak a unit is relative to the typist's own average (1). Slowness and errors
 * compound, and units with few samples are pulled toward average so a single
 * fumble doesn't top the list.
 */
export function score(stat: UnitStats, medianLatency: number): Weakness {
    const slowness = medianLatency && stat.latencySamples ? stat.latency / medianLatency : 1;
    const raw = slowness * (1 + 6 * stat.errorRate);
    const confidence = stat.samples / (stat.samples + 10);
    return { ...stat, slowness, score: 1 + (raw - 1) * confidence };
}`,
      },
    },
    {
      repo: "shipyard",
      title: "shipyard",
      desc: "A containerized Node.js app on ECS Fargate behind an ALB and WAF, provisioned with CDK and shipped by GitHub Actions.",
      tags: ["AWS", "CDK", "TypeScript"],
      date: "2026-09-06",
      featured: false,
      private: false,
      url: "https://github.com/vsonti23/shipyard",
      facts: [
        "ARM64 Fargate tasks (256 CPU units, 512 MiB) behind an ALB that redirects HTTP to HTTPS with an ACM certificate",
        "WAF rule blocks any IP over 100 requests per 60 seconds",
        "the deployment circuit breaker rolls back failed deploys; separate GitHub Actions workflows cover the app, the infrastructure, and deployment",
      ],
      snippet: {
        path: "infra/lib/infra-stack.ts:237-246",
        lang: "ts",
        code: `const fargateTaskScaling = fargateService.autoScaleTaskCount({
  minCapacity: 1,
  maxCapacity: 4,
})

fargateTaskScaling.scaleOnCpuUtilization("ShipyardFargateCpuScaling", {
  targetUtilizationPercent: 50,
  scaleOutCooldown: cdk.Duration.seconds(60),
  scaleInCooldown: cdk.Duration.minutes(5),
})`,
      },
    },
  ],
} as const;

export type Project = (typeof site.projects)[number];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

/** First letter uppercased, matching the reference renderer. */
export function lead(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const SNIPPET_PATH = /^(.*):(\d+)-(\d+)$/;

export function snippetParts(path: string): { file: string; start: number; end: number | null } {
  const match = SNIPPET_PATH.exec(path);
  if (!match) return { file: path, start: 1, end: null };
  return { file: match[1], start: Number(match[2]), end: Number(match[3]) };
}

/** Blob URL for a public snippet, including the cited line range. Private repos have no link. */
export function snippetHref(project: Project): string | null {
  if (project.private) return null;
  const { file, start, end } = snippetParts(project.snippet.path);
  const hash = end != null ? `#L${start}-L${end}` : "";
  return `${project.url}/blob/main/${file}${hash}`;
}

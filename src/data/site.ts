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
  outside:
    "Outside of work, I dig into systems internals and like tinkering in Rust and Go.",
  links: [
    { label: "GitHub", href: "https://github.com/vsonti23" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/varshik-s" },
    { label: "Email", href: "mailto:varshiksonti@gmail.com" },
  ],
  work: "At Terros I work on the backend behind consumer-facing products: data pipelines and search on AWS, built to stay debuggable as they grow. Before that, I built backends at Roomie Hub and Whistle, and finished my master's at ASU.",
  tinkering: [
    {
      name: "rust-wal",
      href: "https://github.com/vsonti23/rust-wal",
      line: "a write-ahead log in Rust",
    },
    {
      name: "rust-file-transfer",
      href: "https://github.com/vsonti23/rust-file-transfer",
      line: "fast file transfer over the network in Rust",
    },
    {
      name: "goproxy",
      href: "https://github.com/vsonti23/goproxy",
      line: "a TCP load balancer in Go",
    },
  ],
  experiments: {
    privateName: "hone",
    name: "shipyard",
    href: "https://github.com/vsonti23/shipyard",
    line: "smaller experiments",
  },
  contributions: [
    { label: "SST", href: "https://github.com/anomalyco/sst/pull/6318" },
    { label: "opensearch-js", href: "https://github.com/opensearch-project/opensearch-js/pull/1126" },
    {
      label: "Tekton's Pipelines-as-Code",
      href: "https://github.com/tektoncd/pipelines-as-code/pull/3043",
    },
  ],
} as const;

# Network Setup — YouTube Transcript Skill

This repo includes the `youtube-transcript` skill (`.claude/skills/youtube-transcript`),
which uses [`yt-dlp`](https://github.com/yt-dlp/yt-dlp) to download YouTube
subtitles/transcripts.

In **Claude Code on the web** the container runs behind a secure egress proxy in
**allowlist mode**: only explicitly allowed hosts are reachable. YouTube is not
allowed by default, so the skill fails there until the hosts below are added.

## Symptom

```
HTTP/2 403
x-deny-reason: host_not_allowed
Host not in allowlist: www.youtube.com. Add this host to your network egress settings to allow access.
```

(yt-dlp may also report `SSL: CERTIFICATE_VERIFY_FAILED` — see note below.)

## Fix — allowlist these egress hosts

On https://claude.com/code → open this environment's settings →
**Network / egress settings** → add:

| Host | Purpose |
|------|---------|
| `youtube.com` | main site / redirects |
| `www.youtube.com` | player page + subtitles (`/api/timedtext`) |
| `m.youtube.com` | mobile client fallback |
| `youtubei.googleapis.com` | YouTube internal (InnerTube) API |
| `i.ytimg.com` | thumbnails / metadata |
| `*.googlevideo.com` | audio/video streams (needed for Whisper fallback) |

Docs: https://code.claude.com/docs/en/claude-code-on-the-web

## Working command (after allowlisting)

```bash
yt-dlp --no-check-certificates \
  --write-auto-sub --write-sub \
  --sub-langs "fr.*,en.*" \
  --skip-download --convert-subs srt \
  "https://www.youtube.com/watch?v=VIDEO_ID"
```

### Note on `--no-check-certificates`

The egress proxy does TLS interception with its own CA. The system CA bundle
(`/etc/ssl/certs/ca-certificates.crt`) already trusts it, but `yt-dlp` ships its
own `certifi` bundle and does not, so it reports `CERTIFICATE_VERIFY_FAILED`.
`--no-check-certificates` bypasses that check. The proxy is trusted
infrastructure, so this is safe in this environment. (Alternatively, point
Python at the system bundle — it is already exported as `SSL_CERT_FILE` /
`REQUESTS_CA_BUNDLE`.)

## Running locally instead

On your own machine there is no egress filtering, so no allowlist changes are
needed:

```bash
pip3 install yt-dlp            # + openai-whisper for the no-subtitles fallback
git checkout claude/funny-johnson-m4nhu6
claude                        # then: "récupère la transcription de <URL>"
```

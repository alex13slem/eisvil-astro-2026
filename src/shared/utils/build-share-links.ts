const e = encodeURIComponent;

export function buildShareLinks(opts: {
  url: string;
  text?: string;
  title?: string;
}) {
  const url = e(opts.url);
  const text = e(opts.text ?? "");
  const title = e(opts.title ?? "");

  return {
    x: `https://twitter.com/intent/tweet?url=${url}${opts.text ? `&text=${text}` : ""}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    vk:
      `https://vk.com/share.php?url=${url}` +
      (opts.title ? `&title=${title}` : ""),
    telegram: `https://t.me/share/url?url=${url}${opts.text ? `&text=${text}` : ""}`,
  };
}

'use client';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <head>
        <title>FUNCH</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <h2>뭔가 엄청난 일이 일어나고 있어요.</h2>
        <p>
          <a href="mailto:1992season@gmail.com">여기로</a> 문의 주시면 빠르게 해결해 드릴게요.
        </p>
        <pre>{error.message}</pre>
        <pre>{error.stack}</pre>
        {error.digest && <pre>{error.digest}</pre>}
        <button onClick={() => reset()}>다시 시도하기</button>
      </body>
    </html>
  );
}

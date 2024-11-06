import Link from 'next/link';

type StreamerProps = {
  id: string;
  name: string;
  logo: string;
};

const StreamerLink = ({ streamer }: { streamer: StreamerProps }) => {
  const { id, name, logo } = streamer;
  return (
    <>
      <Link href={`/streamer/${id}`} className="streamer-link">
        <img src={logo} alt={name} />
        <span>{name}</span>
      </Link>
    </>
  );
};

export default StreamerLink;

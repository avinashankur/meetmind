interface Props {
  params: Promise<{
    meetingId: string;
  }>;
}

export default async function MeetingIdPage({ params }: Props) {
  const { meetingId } = await params;

  return (
    <div>
      <p>Meeting id: {meetingId}</p>
    </div>
  );
}

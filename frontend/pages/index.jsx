import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from '@/config/index';

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>

      { events.length === 0 && <h3>No events to display</h3> }

      {
        events.map(event => (
          <EventItem key={event.id} event={event} />
        ))
      } 
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=3`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1
  }
}

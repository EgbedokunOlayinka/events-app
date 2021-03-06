import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import Link from 'next/link';
import { API_URL } from '@/config/index';

export default function Events({ events }) {
  return (
    <Layout>
      <h1>Events</h1>

      { events.length === 0 && <h3>No events to display</h3> }

      {
        events.map(event => (
          <EventItem key={event.id} event={event} />
        ))
      } 

      {
          events.length > 0 && (
              <Link href='/events'>
                  <a className="btn-secondary">View All Events</a>
              </Link>
          )
      }
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/events?_sort=date:ASC`);
  const events = await res.json();

  return {
    props: { events },
    revalidate: 1
  }
}

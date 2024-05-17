import styles from "./layout.module.css";
//todo: convert to tailwind css
//todo: Add drop down items that are Happy Tails related
//todo: use libraries that are already installed if possible
//todo: api should send to our email
//todo: make it animate over top of current page from side. Should only be a side bar.
//todo: styling
//todo: full screen with (exit icon?) for mobile
//todo: optomize. try to make not a client component if possible. atleast at top level and

interface Props {
  children: React.ReactNode;
}

export default function Layout(props: Props) {
  return (
    <div className={styles.layout}>
      <main className={styles.main}></main>
      <aside className={styles.aside}>
        <div className={styles.header}>
          <h2 className={styles.title}>Need some help?</h2>
        </div>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Send us a message or call or text us at 801-Dog-Love
          </h2>
        </div>
        <div className={styles.asideContent}>{props.children}</div>
      </aside>
    </div>
  );
}

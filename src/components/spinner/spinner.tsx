import styles from './spinner.module.css';

export default function Spinner(): JSX.Element {
  return (
    <div className={styles.el}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
          <div className={styles.loader}>
            <div className={styles.dot}/>
          </div>
        </div>
        <div className={styles.text}>
          Загрузка...
        </div>
      </div>
    </div>
  );
}

import styles from './tag.module.scss';

type Proptypes = {
  content: string;
  id: string;
};

const Tag = ({ id, content }: Proptypes) => {
  return (
    <span className={styles.tag} id={id}>
      {content}
    </span>
  );
};

export default Tag;

import ReactMarkdown from 'react-markdown'

import styles from './questions.module.css'
import answersMarkdown from './answers.md'

const QuestionsPage = () => (
  <div className="container md:w-3/5 mx-auto">
    <ReactMarkdown className={styles.markdown}>{answersMarkdown}</ReactMarkdown>
  </div>
)

export default QuestionsPage

import { ReactNode } from 'React'
import { CgMenuGridO } from 'react-icons/cg'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import { MovieItem } from './MovieItem'
// className={styles.editBtn}

interface containerProps {
  children: ReactNode
  scrollEvent?: React.UIEventHandler<HTMLUListElement>
}

const DragHandle = SortableHandle(() => (
  <button type='button'>
    <CgMenuGridO size='25px' />
  </button>
))

export const SortableItem = SortableElement(() => (
  <li>
    hello
    <DragHandle />
  </li>
))

export const SortableContainer = ({ children, scrollEvent }: containerProps) => {
  return <ul onScroll={scrollEvent}>{children}</ul>
}

import useAuth from '../../hooks/useAuth';
import { useGetNotesQuery } from '../notes/notesApiSlice'
import NoteItem from './NoteItem';
const NotesList = () => {
  const { username, isAdmin, isManager } = useAuth();
  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetNotesQuery('notesList', {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content = '';
  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = notes;

    let filteredIds = []
    if (isAdmin || isManager) {
      filteredIds = [...ids]
    } else {
      filteredIds = ids.filter(id => entities[id].user.username === username)
    }

    let tableContent = '';
    if (filteredIds?.length) {
      tableContent = filteredIds.map(noteId => {
        return <NoteItem key={noteId} noteId={noteId} />
      })
    } else {
      tableContent = null;
    }

    content = (
      <table className="table table--notes">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th note__status">Username</th>
            <th scope="col" className="table__th note__created">Created</th>
            <th scope="col" className="table__th note__updated">Updated</th>
            <th scope="col" className="table__th note__title">Title</th>
            <th scope="col" className="table__th note__username">Owner</th>
            <th scope="col" className="table__th note__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )
  }

  return content;
}

export default NotesList
import { useDispatch } from 'react-redux'
import { useToast } from '../context/ToastContext'
import { addToTeam, updateTeamMember, removeFromTeam } from '../store/teamSlice'

export function useTeamActions() {
  const dispatch = useDispatch()
  const { showToast } = useToast()

  async function add(member) {
    try {
      await dispatch(addToTeam(member)).unwrap()
      showToast(`${member.nickname} added to team!`)
    } catch (err) {
      showToast('Failed to add to team', 'error')
    }
  }

  async function update(id, member, newNickname) {
    try {
      await dispatch(updateTeamMember({ id, member, newNickname })).unwrap()
      showToast(`Nickname updated to "${newNickname}"`)
    } catch (err) {
      showToast('Failed to update nickname', 'error')
    }
  }

  async function remove(id, nickname) {
    try {
      await dispatch(removeFromTeam(id)).unwrap()
      showToast(`${nickname || 'Pokémon'} removed from team`)
    } catch (err) {
      showToast('Failed to remove from team', 'error')
    }
  }

  return { add, update, remove }
}

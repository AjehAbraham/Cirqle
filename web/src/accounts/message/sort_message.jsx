import "../css/sort_message.css";

function SortingList(){
  return(
    <div className="sorting-list-container">
      <div className="filter-options">
        <p>All</p>
        <p>Unread</p>
        <p>Groups</p>
        <span className="material-symbols-outlined">add_circle</span>
      </div>
      <div className="archive-container">
        <p>Archived</p>
        <p>25</p>
      </div>
    </div>
    );
}
export default SortingList;
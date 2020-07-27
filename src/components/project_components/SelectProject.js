import React from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

class SelectProject extends React.Component {
  constructor() {
    super();
    this.state = {
      searchValue: [
      ],
      isLoading: false,
    };
    this.searchDB = this.searchDB.bind(this);
    this.selectingProject = this.selectingProject.bind(this);
  }

  searchDB(query) {
    this.setState({ isLoading: true });
    fetch(`/api/projects/${query}`)
      .then((response) => response.json())
      .then((res) => {
        if(res.hasOwnProperty("status")){
          this.setState({ isLoading: false });

        }else{
          this.setState({ searchValue: res });
         this.setState({ isLoading: false });

        }})
        console.log(this.state.searchValue);

  }


  selectingProject(projectID){
    console.log(projectID)
   this.props.updateSelected(projectID);

  }
  
  render() {
    const filterByFields = ["projectName", "projectID"];

    return (
        <AsyncTypeahead
          filterBy={filterByFields}
          id="async-example"
          isLoading={this.state.isLoading}
          labelKey="projectName"
          minLength={2}
          onSearch={this.searchDB}
          options={this.state.searchValue}
          placeholder="Search for a project via name/id"
          onChange={(sel) => {this.selectingProject(sel[0].projectID)}}
          renderMenuItemChildren={(options,props) => (
            <div>
              {options.projectName}
              <div>
                <small>Project ID: {options.projectID}</small>
              </div>
            </div>
          )}
        />
    );
  }
}

export default SelectProject;

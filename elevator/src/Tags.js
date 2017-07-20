import React from 'react';
import { WithContext as ReactTags } from 'react-tag-input';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        var tags = [];
        if(props.tags)
        {
          for(var i = 0; i<props.tags.length; i++)
          {
            tags.push({
                id: tags.length + 1,
                text: props.tags[i],
            });
          }
        }
        this.state = {
          tags: tags,
        }
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
    }

    handleDelete(i) {
        var tags = this.state.tags;
        tags.splice(i, 1);
        this.setState({tags: tags});
        this.props.getState(this.props.i, this.makeList());
    }

    handleAddition(tag) {
      var tags = this.state.tags;
      var tagslist = this.makeList();
      if(tagslist.indexOf(tag) !== -1)
      {
        return;
      }
        tags.push({
            id: tags.length + 1,
            text: tag,
        });
      this.setState({tags: tags});
      this.props.getState(this.props.i, this.makeList());
    }

    makeList() {
      var tags = this.state.tags;
      var tagslist = [];
      for(var i=0; i<tags.length; i++)
      {
        tagslist.push(tags[i].text);
      }
      return tagslist;
    }

    render() {

        return (
            <div>
                <ReactTags
                    classNames={{ tag: 'tag', tagInput: 'tagInputFieldClass', tagInputField: 'tagInputFieldClass'}}
                    tags={this.state.tags}
                    delimiters={[188]}
                    handleDelete={this.handleDelete}
                    handleAddition={this.handleAddition}/>
            </div>
        )
    }
}

export default Tags;

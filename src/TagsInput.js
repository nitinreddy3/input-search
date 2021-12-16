import React, { useState, useEffect } from "react";
import { data } from "./constant";

const TagsInput = (props) => {
  const formattedList = (list, keys) => {
    return list.map((item) => {
      if (item.isHeaderGroup) {
        return (
          <optgroup
            label={item.attribute}
            style={{ width: 100, float: "left" }}
          >
            {list.map(({ isHeaderGroup, attribute, entityName }) => {
              if (!isHeaderGroup && attribute === item.attribute) {
                return (
                  <option
                    onChange={() => setShowSelectDropdown(true)}
                    value={entityName}
                    id={attribute}
                    style={{ background: tags.includes(`${attribute} : ${entityName}`) ? 'red' : '#fff' }}
                  >
                    {entityName}
                  </option>
                );
              }
            })}
          </optgroup>
        );
      }
    });
  };

  const formattedFilteredList = (list) => {
    return list.map(({ entityName, attribute }) => {
      return (
        <option
          onChange={() => setShowSelectDropdown(true)}
          value={entityName}
          id={attribute}
          style={{ backgroundColor: tags.includes(`${attribute} : ${entityName}`) ? '#aaa' : '#fff' }}
        >
          {`${attribute} : ${entityName}`}
        </option>
      );
    });
  };

  const getList = (data) => {
    return formattedList(Object.values(data).flat(), Object.keys(data));
  };
  let [tags, setTags] = useState([]);
  const [list, setList] = useState(getList(data));
  const [plainList, setPlainList] = useState([...Object.values(data).flat()]);
  let [filteredList, setFilteredList] = useState([])

  const [showSelectDropdown, setShowSelectDropdown] = useState(false);

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };
  const addTags = (e) => {
    // if (event.target.value !== "") {
    //   setTags([...tags, event.target.value]);
    //   event.target.value = "";
    // }
    const { value, id } = e.target || {};
    if (value !== "") {
      filteredList = list.filter(i => i.toLowerCase().includes(value.toLowerCase()) || i.toLowerCase().includes(id.toLowerCase()))
      console.log(filteredList);
    }
  };

  const searchItem = e => {
    const { value, id } = e.target || {};
    if (value !== "") {
      filteredList = plainList.filter(({ attribute, entityName = "", isHeaderGroup = false }) => {
        if (!isHeaderGroup) {
          return entityName?.toLowerCase()?.includes(value.toLowerCase()) || attribute?.toLowerCase()?.includes(value.toLowerCase())
        }
      })
      // console.log(filteredList);
      setFilteredList(formattedFilteredList(filteredList));
    } else {
      filteredList = [];
      setFilteredList([]);
    }
  }

  const selectItem = (e) => {
    const { options } = e.target || {};
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        tags = [...tags, `${options[i].id} : ${options[i].value}`];
      }
    }
    setTags([...new Set(tags)]);
  };

  return (
    <>
      <div className="tags-input">
        <ul id="tags">
          {tags.map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          type="text"
          onKeyUp={(event) => (event.key === "Enter" ? addTags(event) : null)}
          placeholder="Press enter to add tags"
          onFocus={() => setShowSelectDropdown(true)}
          onChange={(e) => searchItem(e)}
        // onBlur={() => setShowSelectDropdown(false)}
        />
      </div>
      {showSelectDropdown && !filteredList.length && (
        <select onChange={(e) => selectItem(e)} multiple style={{ width: 480 }}>
          {list}
        </select>
      )}
      {filteredList.length > 0 && <select onChange={(e) => selectItem(e)} multiple style={{ width: 480 }}>
        {filteredList}
      </select>}
    </>
  );
};

export default TagsInput;

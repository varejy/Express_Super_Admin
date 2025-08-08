import React from "react";

import CreateBtnGenerator from "../../../../../../../../components/CreateBtnGenerator/CreateBtnGenerator";

import styles from "./CreateCompanyBtn.module.css";

function CreateCompanyBtn(props) {
  return (
    <div className={styles.wrapper} onClick={props.handleAddCompany}>
      <CreateBtnGenerator text="Добавить компанию" />
    </div>
  );
}

export default CreateCompanyBtn;

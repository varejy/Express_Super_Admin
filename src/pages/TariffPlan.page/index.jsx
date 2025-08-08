import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { format } from "date-fns";
import { type } from "ramda";
import { useDispatch, useSelector } from "react-redux";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Tab } from "@mui/material";

import Header from "./components/Header/Header";
import EditButton from "../../components/EditButton/EditButton";
import DeleteButton from "./components/DeleteButton/DeleteButton";

import styles from "./index.module.css";
import SubTitle from "../../components/SubTitle/SubTitle";
import ServicesForm from "./components/ServicesForm/ServicesForm";
import Drawer from "../../components/Drawer/Drawer";
import CreateTariffPlanForm from "./components/CreateTariffPlanForm/CreateTariffPlanForm";

import { tariffIntervalOptions } from "../../redux/constants/intervalOptions";

import getAllTariffPlanServices from "../../redux/services/TariffPlans/TariffServices/getAllTariffPlanServices";
import getAllTariffPlans from "../../redux/services/TariffPlans/getAllTariffPlans";
import deleteTariffPlan from "../../redux/services/TariffPlans/deleteTariffPlan";

function TariffPlanBlock(props) {
  const findOption = (service, options) =>
    options.find((item) => item.key === +service.interval);
  return (
    <div className={styles.tariffPlanBlock}>
      <div className={styles.tariffPlanBtns}>
        {props.tariff.status !== 2 && (
          <DeleteButton
            onClick={() => props.handleDeleteTariffPlan(props.id)}
          />
        )}
        <EditButton onClick={() => props.handleEditTariffPlan(props.tariff)} />
      </div>
      <div className={styles.blockHeader}>
        <div className={styles.blockTitle}>{props.title}</div>
        <div className={styles.blockSubtitle}>
          <SubTitle
            values={[
              "Аренда ПО",
              `Создано ${format(new Date(props.createdAt), "dd/MM/yyyy")}`,
              `Последнее изменения ${format(
                new Date(props.createdAt),
                "dd/MM/yyyy"
              )}`,
            ]}
          />
        </div>
      </div>

      <div className={styles.tiles}>
        <div className={styles.tile}>
          <p className={styles.tileTitle}>Стоимость</p>
          <p className={styles.tileValue}>
            {`${props.price} `}
            {findOption(props, tariffIntervalOptions).text}
          </p>
        </div>
        <div className={styles.tile}>
          <p className={styles.tileTitle}>Водителей включено</p>
          <p className={styles.tileValue}>{props.configuration.drivers}</p>
        </div>
      </div>

      <div className={styles.blockPart}>
        {props.tariffPlanServices.filter(
          (item) => item.addonToTariffPlan.isIncluded && item
        ).length !== 0 && <p className={styles.partTitle}>Включённые услуги</p>}
        <div className={styles.partContent}>
          {props.tariffPlanServices.map(
            (item) =>
              item.addonToTariffPlan.isIncluded && (
                <div key={item.id}>{item.title}</div>
              )
          )}
        </div>
      </div>

      <div className={styles.blockPart}>
        {props.tariffPlanServices.filter(
          (item) => !item.addonToTariffPlan.isIncluded && item
        ).length !== 0 && (
          <p className={styles.partTitle}>Дополнительные услуги</p>
        )}

        <div className={styles.partContent}>
          <InformationListDecorator
            values={props.tariffPlanServices
              .map(
                (item) =>
                  !item.addonToTariffPlan.isIncluded && [
                    item.title,
                    +item.price,
                    findOption(item, tariffIntervalOptions).text,
                  ]
              )
              .filter((item) => type(item) === "Array")}
          />
        </div>
      </div>
    </div>
  );
}

function TariffPlanBlockList(props) {
  const [state, setState] = useState(false);
  const [activeTariff, setActiveTariff] = useState();
  const dispatch = useDispatch();

  const handleDeleteTariffPlan = (id) => {
    dispatch(deleteTariffPlan(id));
  };
  const handleEditTariffPlan = (tariff) => {
    setActiveTariff(tariff);
    setState(true);
  };

  const toggleDrawer = (value) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(value);
  };
  return (
    <div className={styles.tariffPlansFlexWrapper}>
      {props.tariffPlans.map((item) => (
        <TariffPlanBlock
          key={item.id}
          {...item}
          tariff={item}
          handleDeleteTariffPlan={handleDeleteTariffPlan}
          handleEditTariffPlan={handleEditTariffPlan}
        />
      ))}
      <Drawer
        status={state}
        component={
          <CreateTariffPlanForm toggleDrawer={toggleDrawer} {...activeTariff} />
        }
        toggleDrawer={toggleDrawer}
        onOpen={() => {}}
      />
    </div>
  );
}

function ServiceSettingsButton() {
  return (
    <div className={styles.settingsWrapper}>
      <div className={styles.settingsImage} />
      <p>Управление услугами</p>
    </div>
  );
}

function InformationListDecorator(props = {}) {
  const { values } = props;

  return (
    <div className={styles.informationListWrapper}>
      {values.map(([key, value, interval]) => (
        <div className={styles.infoListRow} key={key}>
          <div className={styles.infoListKeyColumn}>{key}</div>
          <div className={styles.infoListValueColumn}>
            {`${value} ${interval}`}
          </div>
        </div>
      ))}
    </div>
  );
}

function TariffPlanPanels() {
  const { tariffPlans } = useSelector((state) => state.tariffPlans);
  return (
    <>
      <TabPanel value="current">
        <TariffPlanBlockList
          tariffPlans={tariffPlans.filter((item) => item.status === 0)}
        />
      </TabPanel>
      <TabPanel value="archived">
        <TariffPlanBlockList
          tariffPlans={tariffPlans.filter((item) => item.status === 1)}
        />
      </TabPanel>
      <TabPanel value="removed">
        <TariffPlanBlockList
          tariffPlans={tariffPlans.filter((item) => item.status === 2)}
        />
      </TabPanel>
      <TabPanel value="serviceManager">
        <ServicesForm />
      </TabPanel>
    </>
  );
}

function TariffPlanPage() {
  const [value, setValue] = useState("current");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTariffPlanServices());
    dispatch(getAllTariffPlans());
  });

  return (
    <Box className={styles.wrapper}>
      <Header />
      <TabContext value={value}>
        <div className={styles.subHeaderWrapper}>
          <div className={styles.tabLists}>
            <TabList
              className={styles.firstTabList}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab
                className={styles.tab}
                label="Текущие тарифные планы"
                value="current"
              />
              <Tab className={styles.tab} label="Архивные" value="archived" />
              <Tab className={styles.tab} label="Удаленные" value="removed" />
              <Tab
                className={classNames(styles.settings, styles.tab)}
                label={<ServiceSettingsButton />}
                value="serviceManager"
              />
            </TabList>
          </div>
        </div>
        <TariffPlanPanels />
      </TabContext>
    </Box>
  );
}

export default TariffPlanPage;

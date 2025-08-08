import React, { useState } from "react";
import classNames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { type } from "ramda";

import { Divider, Select } from "semantic-ui-react";
import { Checkbox, FormControlLabel } from "@mui/material";

import {
  tariffIntervalOptions,
  tariffDriversIntervalOptions,
} from "../../../../redux/constants/intervalOptions";

import SubmitAndCancelButtons from "../../../../components/Drawer/components/SubmitAndCancelButtons/SubmitAndCancelButtons";

import styles from "./CreateTariffPlanForm.module.css";
import TextInput from "../../../../components/TextInput/TextInput";
import addTariffPlan from "../../../../redux/services/TariffPlans/addNewTariffPlan";
import editTariffPlan from "../../../../redux/services/TariffPlans/editTariffPlan";

const createField = (text, content) => (
  <div className={styles.field}>
    <div className={styles.fieldText}>{text}</div>
    <div className={styles.fieldContent}>{content}</div>
  </div>
);

const getSemanticSelectedItem = (data) => {
  if (!data) return undefined;
  return data.options[+data.value - 1];
};

function ServiceRow(props) {
  return (
    <div className={styles.serviceContainer}>
      <div className={styles.serviceRow}>
        <div className={styles.serviceCheckbox}>
          <Checkbox
            checked={
              props.service.active ||
              (!props.service.active && props.id) ||
              false
            }
            onChange={(e) => props.onActive(e.target.checked)}
            size="small"
          />
        </div>
        <div className={styles.serviceContent}>
          <div className={styles.serviceContentRow}>
            <div
              className={classNames(
                styles.serviceInfoBlock,
                styles.infoFullWidth
              )}
            >
              <div className={styles.serviceInformation}>
                <p className={styles.serviceTitle}>{props.title}</p>
                <p className={styles.serviceDescription}>{props.description}</p>
              </div>
            </div>
          </div>
          <Divider className={styles.divider} />
        </div>
      </div>
    </div>
  );
}

export default function CreateTariffPlanForm(props) {
  const isEdit = Boolean(props.id);
  const { tariffPlanServices } = useSelector((state) => state.tariffPlans);
  const dispatch = useDispatch();

  const includedServices =
    props.tariffPlanServices
      ?.map(
        (item) =>
          item.addonToTariffPlan.isIncluded && {
            ...item,
            active: true,
          }
      )
      ?.filter((item) => item) || [];

  const additionalServices =
    props.tariffPlanServices
      ?.map(
        (item) =>
          !item.addonToTariffPlan.isIncluded && {
            ...item,
            active: true,
          }
      )
      ?.filter((item) => item) || [];

  const [tariffPlan, setTariffPlan] = useState({
    title: props.title || "",
    description: props.description || "",
    price: props.price || null,
    currency: props.currency || "usd",
    interval: props.interval || 2592000000,
    includedServices: [
      ...tariffPlanServices.filter(
        (item) =>
          includedServices.find((service) => service.id === item.id) ===
            undefined &&
          additionalServices.find((service) => service.id === item.id) ===
            undefined
      ),
      ...includedServices,
    ],
    additionalServices: [
      ...tariffPlanServices.filter(
        (item) =>
          additionalServices.find((service) => service.id === item.id) ===
            undefined &&
          includedServices.find((service) => service.id === item.id) ===
            undefined
      ),
      ...additionalServices,
    ],
    configuration: props.configuration || {
      drivers: null,
      interval: 2592000000,
      trip: null,
      excessDriverPrice: null,
    },
    hidden: 0,
  });

  const findOption = (service, options) =>
    options.find((item) => +item.key === +service.interval);

  const handleSubmit = () => {
    const includedServices = tariffPlan.includedServices
      .map((item) => item.active && item.id)
      .filter((item) => item);

    const additionalServices = tariffPlan.additionalServices
      .map((item) => item.active && item.id)
      .filter((item) => item);

    const correctTariffPlan = {
      ...tariffPlan,
      price: +tariffPlan.price,
    };

    if (isEdit) {
      correctTariffPlan.includedServices = includedServices || [];
      correctTariffPlan.additionalServices = additionalServices || [];
    } else {
      correctTariffPlan.includedServices =
        includedServices.length > 0 ? includedServices : undefined;
      correctTariffPlan.additionalServices =
        additionalServices.length > 0 ? additionalServices : undefined;
    }

    dispatch(
      !isEdit
        ? addTariffPlan(correctTariffPlan)
        : editTariffPlan({ ...correctTariffPlan, id: props.id })
    ).then((result) => type(result) !== "Error" && props.toggleDrawer()());
  };

  const handleActiveService = (status, index, isAddon) => {
    if (!isAddon) {
      tariffPlan.includedServices[index] = {
        ...tariffPlan.includedServices[index],
        active: status,
      };

      setTariffPlan({
        ...tariffPlan,
        additionalServices: tariffPlanServices
          .map((service) => {
            const included = tariffPlan.includedServices.find(
              (s) => s.id === service.id
            );
            if (!included) {
              const addon = tariffPlan.additionalServices.find(
                (s) => s.id === service.id
              );
              return addon;
            }
            if (included && included.active) return null;
            return included;
          })
          .filter((s) => s),
      });
    } else {
      tariffPlan.additionalServices[index] = {
        ...tariffPlan.additionalServices[index],
        active: status,
      };
      setTariffPlan({
        ...tariffPlan,
        includedServices: tariffPlanServices
          .map((service) => {
            const addon = tariffPlan.additionalServices.find(
              (s) => s.id === service.id
            );
            if (!addon) {
              const included = tariffPlan.includedServices.find(
                (s) => s.id === service.id
              );
              return included;
            }
            if (addon.active) return null;
            return addon;
          })
          .filter((s) => s),
      });
    }
  };

  const includeAllServices = (_, checked) => {
    if (!checked) return;

    tariffPlan.includedServices.forEach((service, index) =>
      handleActiveService(true, index, 0)
    );
  };

  const includeAllAdditionalServices = (_, checked) => {
    if (!checked) return;

    tariffPlan.additionalServices.forEach((service, index) =>
      handleActiveService(true, index, 1)
    );
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>
          {isEdit ? "Редактирование тарифного плана" : "Создать тарифный план"}
        </div>
        <div className={styles.formWrapper}>
          <form className={styles.form}>
            <div className={styles.formBlock}>
              <div className={styles.formFields}>
                {createField(
                  "Название тарифного плана*",
                  <TextInput
                    value={tariffPlan.title || ""}
                    onChange={(e) =>
                      setTariffPlan({
                        ...tariffPlan,
                        title: e.target.value,
                      })
                    }
                    className={classNames(styles.inputField)}
                    placeholder="Введите название..."
                    size="small"
                  />
                )}
                {createField(
                  "Стоимость",
                  <div className={classNames(styles.flexRow, styles.costRow)}>
                    <Select
                      className={styles.select}
                      options={tariffIntervalOptions}
                      defaultValue={
                        findOption(tariffPlan, tariffIntervalOptions).value
                      }
                      onChange={(_, data) => {
                        const option = getSemanticSelectedItem(data);
                        setTariffPlan({
                          ...tariffPlan,
                          interval: option.key,
                        });
                      }}
                    />
                    <TextInput
                      value={tariffPlan.price || "0"}
                      onChange={(e) =>
                        setTariffPlan({
                          ...tariffPlan,
                          price: e.target.value,
                        })
                      }
                      className={styles.inputField}
                      type="number"
                      placeholder="0"
                    />
                  </div>
                )}
                {createField(
                  "Водителей включено (активных)",
                  <TextInput
                    type="number"
                    className={classNames(
                      styles.inputField,
                      styles.driverIncludeCountInput,
                      styles.centerText
                    )}
                    value={tariffPlan.configuration.drivers || "0"}
                    onChange={(e) =>
                      setTariffPlan({
                        ...tariffPlan,
                        configuration: {
                          ...tariffPlan.configuration,
                          drivers: e.target.value,
                        },
                      })
                    }
                    placeholder="0"
                    size="small"
                  />
                )}
                {createField(
                  "Параметр активного водителя",
                  <div className={styles.flexRow}>
                    <Select
                      style={{ width: "250px" }}
                      className={styles.select}
                      options={tariffDriversIntervalOptions}
                      defaultValue={
                        findOption(
                          tariffPlan.configuration,
                          tariffDriversIntervalOptions
                        ).value
                      }
                      onChange={(_, data) => {
                        const option = getSemanticSelectedItem(data);
                        setTariffPlan({
                          ...tariffPlan,
                          configuration: {
                            ...tariffPlan.configuration,
                            interval: +option.key,
                          },
                        });
                      }}
                    />
                    <TextInput
                      type="number"
                      style={{ width: "70px" }}
                      className={classNames(
                        styles.inputField,
                        styles.centerText
                      )}
                      value={tariffPlan.configuration.trip || ""}
                      onChange={(e) =>
                        setTariffPlan({
                          ...tariffPlan,
                          configuration: {
                            ...tariffPlan.configuration,
                            trip: e.target.value,
                          },
                        })
                      }
                      placeholder="0"
                    />
                  </div>
                )}
                {createField(
                  "Стоимость за одного водителя за превышение",
                  <div className={styles.inputWithLabel}>
                    <TextInput
                      className={classNames(
                        styles.inputField,
                        styles.centerText
                      )}
                      placeholder="0"
                      size="small"
                      type="number"
                      value={tariffPlan.configuration.excessDriverPrice || ""}
                      onChange={(e) =>
                        setTariffPlan({
                          ...tariffPlan,
                          configuration: {
                            ...tariffPlan.configuration,
                            excessDriverPrice: e.target.value,
                          },
                        })
                      }
                    />
                    <span className={styles.label}>грн.</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.formBlock}>
              <div className={styles.formBlockHeader}>
                <div className={styles.formBlockTitle}>Включено в тариф</div>
                <div className={styles.formBlockIncludeServices}>
                  <FormControlLabel
                    className={styles.formCheckBox}
                    value="includeAllServices"
                    labelPlacement="start"
                    control={
                      <Checkbox
                        size="small"
                        onChange={includeAllServices}
                        className={styles.checkbox}
                      />
                    }
                    label="Включить все услуги"
                  />
                </div>
              </div>
              <div className={styles.formServiceList}>
                {tariffPlan.includedServices.map((service, i) => (
                  <ServiceRow
                    key={service.id}
                    title={service.title}
                    type={0}
                    service={service}
                    onActive={(status) => handleActiveService(status, i, 0)}
                    description={`${service.price} ${
                      findOption(service, tariffIntervalOptions).text
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className={styles.formBlock}>
              <div className={styles.formBlockHeader}>
                <div className={styles.formBlockTitle}>
                  Дополнительные услуги
                </div>
                <div className={styles.formBlockIncludeServices}>
                  <FormControlLabel
                    className={styles.formCheckBox}
                    value="includeAllAdditionalServices"
                    labelPlacement="start"
                    control={
                      <Checkbox
                        size="small"
                        onChange={includeAllAdditionalServices}
                        className={styles.checkbox}
                      />
                    }
                    label="Включить все услуги"
                  />
                </div>
              </div>
              <div className={styles.formServiceList}>
                {tariffPlan.additionalServices.map((service, i) => (
                  <ServiceRow
                    key={service.id}
                    title={service.title}
                    type={1}
                    service={service}
                    onActive={(status) => handleActiveService(status, i, 1)}
                    description={`${service.price} ${
                      findOption(service, tariffIntervalOptions).text
                    }`}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
      <SubmitAndCancelButtons
        handleSubmit={handleSubmit}
        handleClose={props.toggleDrawer()}
        approveText="Создать тарифный план"
      />
    </div>
  );
}

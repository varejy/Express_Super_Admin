import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";

import { Select } from "semantic-ui-react";

import styles from "./ServicesForm.module.css";
import DeleteButton from "../DeleteButton/DeleteButton";
import BlueButton from "../../../../components/BlueButton/BlueButton";
import TextInput from "../../../../components/TextInput/TextInput";
import addTariffPlanService from "../../../../redux/services/TariffPlans/TariffServices/addNewTariffPlanService";
import deleteTariffPlanService from "../../../../redux/services/TariffPlans/TariffServices/deleteTariffPlanService";

import { tariffIntervalOptions } from "../../../../redux/constants/intervalOptions";
import editTariffPlanService from "../../../../redux/services/TariffPlans/TariffServices/editTariffPlanService";

const createField = (text, content) => (
  <div className={styles.field}>
    <div className={styles.fieldText}>{text}</div>
    <div className={styles.fieldContent}>{content}</div>
  </div>
);

function ServiceBlock(props) {
  const { value: activeInterval } =
    tariffIntervalOptions.find(
      (item) => item.key === +props.service.interval
    ) || tariffIntervalOptions[0];

  return (
    <div key={props.service.serviceNumber} className={styles.block}>
      <div className={styles.blockContent}>
        <div className={classNames(styles.formRow, styles.serviceTitleRow)}>
          {createField(
            "Название услуги*",
            <div className={styles.inputRow}>
              <TextInput
                className={styles.inputField}
                value={props.service.title}
                onChange={(data) =>
                  props.onChange(props.service.id, {
                    key: "title",
                    value: data.target.value,
                  })
                }
                placeholder="Введите название..."
                size="small"
              />
              <DeleteButton
                onClick={() => props.onDelete(props.service.id)}
                className={styles.deleteButton}
              />
            </div>
          )}
        </div>
        <div className={classNames(styles.formRow, styles.serviceCostRow)}>
          {createField(
            "Стоимость",
            <div className={styles.flexRow}>
              <Select
                defaultValue={`${activeInterval}` || "1"}
                onChange={(_, data) => {
                  const option = data.options.find(
                    (option) => option.value === data.value
                  );
                  if (!option) return;

                  props.onChange(props.service.id, {
                    key: "interval",
                    value: option.key,
                  });
                }}
                className={styles.costSelect}
                options={tariffIntervalOptions}
              />
              <TextInput
                type="number"
                onChange={(data) =>
                  props.onChange(props.service.id, {
                    key: "price",
                    value: data.target.value,
                  })
                }
                value={props.service.price}
                className={styles.inputField}
                placeholder="120"
              />
            </div>
          )}
        </div>
        {!props.service.committed && (
          <div className={styles.saveButton}>
            <BlueButton
              label="Сохранить"
              onClick={() => props.onSave(props.service.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ServicesForm() {
  const { tariffPlanServices: fetchedServices } = useSelector(
    (rootReducer) => rootReducer.tariffPlans
  );
  const tariffPlanServices = fetchedServices.map((service) => ({
    ...service,
    description: service.description || "",
    committed: true,
  }));

  const [services, setServices] = useState(tariffPlanServices);
  const dispatch = useDispatch();

  const changeService = (id, field) => {
    setServices(
      services.map((service) => {
        if (service.id === id) {
          return {
            ...service,
            [field.key]: field.value,
            committed: false,
          };
        }

        return service;
      })
    );
  };

  const addService = () => {
    const updatedServices = [
      {
        id: (Math.random() * 0xffff).toString(32),
        title: "",
        description: "",
        price: 1,
        interval: 86400000,
        currency: "UAH",
        committed: false,
        new: true,
      },
      ...services,
    ];
    setServices(updatedServices);
  };

  const deleteService = (id) => {
    const service = services.find((service) => service.id === id);
    if (service && !service.committed) {
      setServices(services.filter((service) => service.id !== id));
      return;
    }

    dispatch(deleteTariffPlanService(id));
  };

  const handleSaveTariffService = (id) => {
    const service = services.find((item) => item.id === id);
    if (!service) return;
    const payload = {
      ...service,
      id: undefined,
    };

    if (payload.description === "") {
      Reflect.deleteProperty(payload, "description");
    }

    dispatch(
      service.new
        ? addTariffPlanService({
            ...payload,
            price: Number(service.price),
            interval: Number(service.interval),
            currency: "UAH",
          })
        : editTariffPlanService(id, payload)
    );
  };

  useEffect(() => {
    setServices(tariffPlanServices);
  }, [fetchedServices]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.containerHeader}>
        <div className={styles.title}>Перечень услуг</div>
        <BlueButton onClick={addService} label="Добавить услугу" />
      </div>
      <div className={styles.container}>
        {services.map((service, index) => (
          <ServiceBlock
            key={service.id}
            service={service}
            onSave={handleSaveTariffService}
            onDelete={deleteService}
            onChange={changeService}
            serviceNumber={index + 1}
          />
        ))}
      </div>
    </div>
  );
}

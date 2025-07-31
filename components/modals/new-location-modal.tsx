import { Heading } from "@/components/ui/heading"
import {
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader
} from "@/components/ui/modal"

import { useNewServiceStore } from "@/store/newServiceStore"
import { SelectedValue } from "@/types"
import React, { useState } from "react"
import { Text, View } from "react-native"
import ServiceLocation from "../common/select-service-location"
import { Button, ButtonText } from "../ui/button"

export default function NewLocationModal() {
    const { addLocation, locationModal, modal: showModal } = useNewServiceStore();
    const [selectedDepartment, setSelectedDepartment] = useState<SelectedValue | null>(null);
    const [selectedCity, setSelectedCity] = useState<SelectedValue | null>(null);
    
    function handleAddLocation() {
        addLocation({ selectedCity, selectedDepartment })
        locationModal();
    }

    return (
    <Modal
        isOpen={showModal}
        onClose={() => locationModal()}
      >
        <ModalBackdrop />
        <ModalContent className="max-w-[395px]">
          <ModalHeader className="gap-2 items-start">
            <View className="gap-1">
              <Heading size="2xl" className="text-typography-950">
                Donde ofreces servicios?
              </Heading>
              <Text className="text-xl text-typography-500">
                Ingresa una ciudad donde aceptarias una solicitud para un servicio, puedes agregar tantas como quieras.
              </Text>
            </View>

          </ModalHeader>
          <ModalBody>
            <ServiceLocation 
                handleCity={(city: SelectedValue) => setSelectedCity(city)}
                handleDepartment={(department: SelectedValue) => setSelectedDepartment(department)} 
            />
          </ModalBody>
          <ModalFooter className="flex justify-between">
            <Button
              variant="outline"
              action="secondary"
              onPress={() => locationModal()}
            >
              <ButtonText>Cancelar</ButtonText>
            </Button>
            <Button
            isDisabled={!(selectedDepartment && selectedCity)}
              onPress={() => handleAddLocation()}
            >
              <ButtonText>Confirmar localidad</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}
import { CloseIcon } from "@chakra-ui/icons";
import { IconButton, Tag } from "@chakra-ui/react";

function EditableTag({ onClickCloseButton, children, ...props }) {
  return (
    <Tag
      position="relative"
      _hover={{
        button: {
          display: "flex",
        },
      }}
      {...props}
    >
      {children}
      <IconButton
        onClick={onClickCloseButton}
        position="absolute"
        display="none"
        top="-6px"
        right="-6px"
        minW="none"
        w="16px"
        h="16px"
        borderRadius="8px"
        px="0"
        py="0"
        colorScheme="red"
        icon={<CloseIcon w="8px" h="8px" />}
      />
    </Tag>
  );
}

export default EditableTag;

/*
  OTA Server Use
  ===============
  1) LOADING AN UPGRADE IMAGE (for Clients or for the Server itself)
    Request New Image Load – Image index parameter is a don’t care.
    Server will respond with the allocated image index or an error if no
    space is available.
    Transfer blocks from the image with the Load Image Block Request
    command. Server will determine from the image header if the
    image is for a client of for itself.
    
  2) UPGRADING CLIENTS
    Verify the loaded client image with the Action Request 0x01
    command. Then issue the Action Request 0x05 to cause an OTA
    new client image available message

  3) UPGRADING THE SERVER
    Issue an Action Request 0x04 to switch server images. Then issue a
    System Reset Request 0x00 (soft reset) to reboot the device into the
    new server image.
*/

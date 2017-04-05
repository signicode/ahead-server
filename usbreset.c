#include <stdlib.h>
#include <stdio.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/ioctl.h>
#include <linux/usbdevice_fs.h>

void main(int argc, char **argv)
{
    char devicename[1024];
    const char *filename = devicename;
    int fd;

    if ( 2 > argc || 3 < argc ) {
        printf("Give USB device name as parameter\n");
        exit(1);
    }

    if ( 2 == argc ) 
        filename = argv[1];
    else
        sprintf( devicename, "/dev/bus/usb/%s/%s", argv[1], argv[2] );

    printf( "Resetting USB device '%s'\n", filename );

    fd = open(filename, O_WRONLY);
    if (fd == -1) {
        perror("USB device open failed");
        exit(2);
    }
    if (ioctl(fd, USBDEVFS_RESET, 0) == -1) {
        // Don't care!  It usually does, when we need to reset it.
        perror("USBDEVFS_RESET device ioctl failed");
        exit(3);
    }
    close(fd);
}

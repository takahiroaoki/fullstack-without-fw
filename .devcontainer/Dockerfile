FROM amazonlinux:2023.8.20250818.0

# dnf fixes tool versions
RUN dnf install -y \
         git \
         vi \
         make \
         golang \
         nodejs \
     && rm -rf /var/cache/dnf/* \
     && dnf clean all

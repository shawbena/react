# Gateway (telecommunications)

在[电力通信](https://en.wikipedia.org/wiki/Telecommunication)中，网关是有以下意义的网关硬件：


# Types of Proxy Servers 

代理服务器驻留在用户本地电脑，或用户电脑和上目标服务器间的网络上的各种各样的点。

- 传递无修改的请示及响应的代理服务器叫[网关](#gateway)有时也叫 tunneling proxy.
- 前向代理 (forward proxy) 是面向 Internet 的代理，用于索取广泛种类的资源 (大多情形在网上的任何地方)

- [反向代理](https://en.wikipedia.org/wiki/Reverse_proxy) 通常是面向内部的代理，用作前端至后端控制并保护私有服务器上的访问。反向代理通常执行如覆载均衡 (load-balancing)，认证 (authentication)，加密 (decryption) 或缓存 (caching) 任务。

## Open Proxies

开放代理是一个前向代理服务器，任何 Internet 用户都可访问。[Gordon Lyon](https://en.wikipedia.org/wiki/Gordon_Lyon) 估计 Internet 上有 "hundreds of thousands" 的开放代理。一个匿名开放代理 (anonymous open proxy) 允许用户浏览网络或使用其他 Internet 服务时隐藏自己的 [IP address](https://en.wikipedia.org/wiki/IP_address)。有不同深度的匿名，也有无视代理追踪 ("ticking") 客户端的各种方法。

## Reverse Proxies

反向代理 (or surrogate) 是出现在客户端表现为普通的服务器的代理服务器。反向代理转发请求给一个或多个处理请求的服务器。从代理服务器返回的响应就好像是从原始服务器返回的，让客户端并不了解原始服务器。所有来自 Internet 终点是毗邻服务器之一的流量都通过代理服务器。“反向”源自于其对应的 "forward proxy", 因为反向代理与 web server 座落很近, 并服务受限集合的网站。安装代理服务器有几点原因：

- Encryption / SSL acceleration: 当安全 web 站点创建时，[Secure Sockets Layer (SSL)](https://en.wikipedia.org/wiki/Secure_Sockets_Layer) 加密常常不是由服务器自己完成的，而是交给配备 SSL 加速硬件的反向代理。而且一个主机 (host) 可以提供一个单个 "SSL proxy" 以给任意数量的主机提供 SSL 加密；移除单个主机 SSL  Server Certifcate 的需要，缺点是 SSL 代理后的所有主机必须有一个用于 SSL 连接的共享的 DNS 名或 IP 地址。这个问题可由 [X.509](https://en.wikipedia.org/wiki/X.509) 特色的 SubjectAltName 的 certifactes 来部分解决。

- [Load balancing](https://en.wikipedia.org/wiki/Load_balancing_(computing)): 反向代理可以给几个 web servers 分发荷载，每个 web server 服务自己的应用领域。这种情形，反向代理可能需要重写每个 web 页面的 URLs (转换外部的 URLs 为内部的地址)。

- Serve/cache static content:

- Compression: 代理服务器可以优化并压缩内容以加速加载时间。

- Spoon feeding:

- Security: 代理服务器是一个额外层的防护，可以防止一些 OS 和特定 Web 服务器的攻击。然而，他不能提供任何来自服务器自身或 web 应用程序的攻击的保护，这被视为是较大的危胁。

- Extranet Publishing:
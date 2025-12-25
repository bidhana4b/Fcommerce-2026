import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Headphones,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Send,
  Paperclip,
  Filter,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Ticket {
  id: string;
  user: string;
  email: string;
  subject: string;
  message: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: string;
  createdAt: string;
  updatedAt: string;
  avatar: string;
  replies?: number;
}

const mockTickets: Ticket[] = [
  {
    id: "1",
    user: "করিম মিয়া",
    email: "karim@example.com",
    subject: "পেমেন্ট সমস্যা",
    message: "আমার bKash পেমেন্ট সম্পন্ন হয়নি কিন্তু টাকা কেটে গেছে",
    status: "open",
    priority: "urgent",
    category: "পেমেন্ট",
    createdAt: "৫ মিনিট আগে",
    updatedAt: "৫ মিনিট আগে",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=karim",
    replies: 0,
  },
  {
    id: "2",
    user: "রহিমা বেগম",
    email: "rahima@example.com",
    subject: "স্টোর সেটআপ সাহায্য",
    message: "আমি কিভাবে আমার স্টোরে নতুন পণ্য যুক্ত করব?",
    status: "in-progress",
    priority: "medium",
    category: "টেকনিক্যাল",
    createdAt: "১ ঘন্টা আগে",
    updatedAt: "৩০ মিনিট আগে",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahima",
    replies: 2,
  },
  {
    id: "3",
    user: "জামাল হোসেন",
    email: "jamal@example.com",
    subject: "অ্যাকাউন্ট ভেরিফিকেশন",
    message: "আমার অ্যাকাউন্ট ভেরিফাই করতে কি কি ডকুমেন্ট লাগবে?",
    status: "resolved",
    priority: "low",
    category: "অ্যাকাউন্ট",
    createdAt: "২ ঘন্টা আগে",
    updatedAt: "১ ঘন্টা আগে",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jamal",
    replies: 3,
  },
  {
    id: "4",
    user: "সালমা খাতুন",
    email: "salma@example.com",
    subject: "ডেলিভারি ট্র্যাকিং",
    message: "আমার অর্ডার কোথায় আছে? ট্র্যাকিং নাম্বার কাজ করছে না",
    status: "in-progress",
    priority: "high",
    category: "ডেলিভারি",
    createdAt: "৩ ঘন্টা আগে",
    updatedAt: "২ ঘন্টা আগে",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=salma",
    replies: 1,
  },
];

const stats = [
  {
    name: "মোট টিকেট",
    value: "১৫৬",
    change: "+১২",
    icon: MessageSquare,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "খোলা টিকেট",
    value: "২৮",
    change: "+৫",
    icon: AlertCircle,
    color: "from-orange-500 to-red-500",
  },
  {
    name: "সমাধান হার",
    value: "৯২%",
    change: "+৮%",
    icon: CheckCircle2,
    color: "from-green-500 to-emerald-500",
  },
  {
    name: "গড় সময়",
    value: "২.৫ ঘন্টা",
    change: "-০.৫",
    icon: Clock,
    color: "from-purple-500 to-pink-500",
  },
];

export default function SupportSystem() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesSearch =
      ticket.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500";
      case "in-progress":
        return "bg-orange-500";
      case "resolved":
        return "bg-green-500";
      case "closed":
        return "bg-slate-400";
      default:
        return "bg-slate-400";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent":
        return "border-red-500 text-red-600";
      case "high":
        return "border-orange-500 text-orange-600";
      case "medium":
        return "border-yellow-500 text-yellow-600";
      case "low":
        return "border-green-500 text-green-600";
      default:
        return "border-slate-500 text-slate-600";
    }
  };

  return (
    <div className="space-y-6 bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <div className="h-12 w-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <Headphones className="h-6 w-6 text-white" />
            </div>
            সাপোর্ট সিস্টেম
          </h1>
          <p className="text-muted-foreground mt-2">
            ব্যবহারকারীদের সাপোর্ট টিকেট পরিচালনা করুন
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="টিকেট খুঁজুন..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব টিকেট</SelectItem>
              <SelectItem value="open">খোলা</SelectItem>
              <SelectItem value="in-progress">চলমান</SelectItem>
              <SelectItem value="resolved">সমাধান</SelectItem>
              <SelectItem value="closed">বন্ধ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {stat.name}
                    </p>
                    <h3 className="text-2xl font-bold">{stat.value}</h3>
                    <p className="text-xs text-green-600 font-medium mt-1">
                      {stat.change}
                    </p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>সাপোর্ট টিকেট তালিকা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredTickets.map((ticket, index) => (
                <motion.div
                  key={ticket.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Dialog>
                    <DialogTrigger asChild>
                      <Card
                        className="hover:shadow-lg transition-all duration-300 cursor-pointer border-l-4"
                        style={{ borderLeftColor: `var(--${ticket.priority})` }}
                        onClick={() => setSelectedTicket(ticket)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 ring-2 ring-purple-500">
                              <AvatarImage src={ticket.avatar} />
                              <AvatarFallback>
                                {ticket.user.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-base">
                                    {ticket.subject}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    {ticket.user}
                                  </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                  <Badge
                                    className={getStatusColor(ticket.status)}
                                  >
                                    {ticket.status === "open" && "খোলা"}
                                    {ticket.status === "in-progress" && "চলমান"}
                                    {ticket.status === "resolved" && "সমাধান"}
                                    {ticket.status === "closed" && "বন্ধ"}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={getPriorityColor(
                                      ticket.priority,
                                    )}
                                  >
                                    {ticket.priority === "urgent" && "জরুরি"}
                                    {ticket.priority === "high" && "উচ্চ"}
                                    {ticket.priority === "medium" && "মাঝারি"}
                                    {ticket.priority === "low" && "নিম্ন"}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                {ticket.message}
                              </p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {ticket.createdAt}
                                </span>
                                <span className="flex items-center gap-1">
                                  <MessageSquare className="h-3 w-3" />
                                  {ticket.replies} উত্তর
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {ticket.category}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh]">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={ticket.avatar} />
                            <AvatarFallback>
                              {ticket.user.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div>{ticket.subject}</div>
                            <div className="text-sm font-normal text-muted-foreground">
                              {ticket.user} • {ticket.email}
                            </div>
                          </div>
                        </DialogTitle>
                      </DialogHeader>
                      <ScrollArea className="h-[400px] pr-4">
                        <div className="space-y-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-muted-foreground">
                                  {ticket.createdAt}
                                </span>
                                <div className="flex gap-2">
                                  <Badge
                                    className={getStatusColor(ticket.status)}
                                  >
                                    {ticket.status === "open" && "খোলা"}
                                    {ticket.status === "in-progress" && "চলমান"}
                                    {ticket.status === "resolved" && "সমাধান"}
                                    {ticket.status === "closed" && "বন্ধ"}
                                  </Badge>
                                  <Badge
                                    variant="outline"
                                    className={getPriorityColor(
                                      ticket.priority,
                                    )}
                                  >
                                    {ticket.priority === "urgent" && "জরুরি"}
                                    {ticket.priority === "high" && "উচ্চ"}
                                    {ticket.priority === "medium" && "মাঝারি"}
                                    {ticket.priority === "low" && "নিম্ন"}
                                  </Badge>
                                </div>
                              </div>
                              <p className="text-sm">{ticket.message}</p>
                            </CardContent>
                          </Card>
                          {/* Mock replies */}
                          {ticket.replies && ticket.replies > 0 && (
                            <Card className="bg-blue-50 dark:bg-blue-950/20">
                              <CardContent className="p-4">
                                <div className="flex items-start gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin" />
                                    <AvatarFallback>A</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      <span className="font-semibold text-sm">
                                        সাপোর্ট টিম
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        ৩০ মিনিট আগে
                                      </span>
                                    </div>
                                    <p className="text-sm">
                                      আপনার সমস্যা সমাধানের জন্য আমরা কাজ করছি।
                                      শীঘ্রই আপডেট দেওয়া হবে।
                                    </p>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          )}
                        </div>
                      </ScrollArea>
                      <div className="space-y-3 pt-4 border-t">
                        <Textarea placeholder="আপনার উত্তর লিখুন..." rows={3} />
                        <div className="flex items-center justify-between">
                          <Button variant="outline" size="sm" className="gap-2">
                            <Paperclip className="h-4 w-4" />
                            ফাইল সংযুক্ত করুন
                          </Button>
                          <div className="flex gap-2">
                            <Select defaultValue={ticket.status}>
                              <SelectTrigger className="w-[130px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="open">খোলা</SelectItem>
                                <SelectItem value="in-progress">
                                  চলমান
                                </SelectItem>
                                <SelectItem value="resolved">সমাধান</SelectItem>
                                <SelectItem value="closed">বন্ধ</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button className="gap-2 bg-gradient-to-r from-purple-500 to-pink-500">
                              <Send className="h-4 w-4" />
                              পাঠান
                            </Button>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
